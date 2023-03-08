//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8;

contract Courier {

    enum AgreementState {
        LISTED,
        SELECTED,
        PENDING_DELIVERY,
        DELIVERY_FINISHED,
        AGREEMENT_REACHED
    }

    struct Agreement {
        string pickup;
        string dropoff;
        uint cost;
        address participant;
        address courier;
        AgreementState state;
    }

    mapping(address => Agreement) public agreements;

    event AgreementSelected(address indexed participant, address indexed courier);
    event CommenceDelivery(address indexed participant, address indexed courier);

    function getAgreement(address _participant) public view returns (Agreement memory) {
        return agreements[_participant];
    }

    // THESE FUNCTIONS ARE LISTED IN ORDER OF EXPECTED FLOW BETWEEN THE PARTICIPANT AND COURIER

    // Participant creates the agreement
    function createAgreement(string memory _pickup, string memory _dropoff) public payable returns(bool) {
        require(msg.value > 0 wei, "You must put up a payment price.");
        agreements[msg.sender] = Agreement(_pickup, _dropoff, msg.value, msg.sender, address(0), AgreementState.LISTED);
        return true;
    }

    // Courier selects a package to deliver
    function selectPackage(address _participant) public returns(bool) {
        Agreement storage agreement = agreements[_participant];
        require(agreement.state == AgreementState.LISTED, "Package state invalid: needed LISTED");
        agreement.courier = msg.sender;
        agreement.state = AgreementState.SELECTED;
        emit AgreementSelected(_participant, msg.sender);
        return true;
    }

    // Participant accepts courier
    // after this, delivery is expected
    function acceptCourier() public returns(bool) {
        Agreement storage agreement = agreements[msg.sender];
        require(agreement.state == AgreementState.SELECTED, "Package state invalid: needed SELECTED");
        agreement.state = AgreementState.PENDING_DELIVERY;
        emit CommenceDelivery(msg.sender, agreement.courier);
        return true;
    }

    function rejectCourier() public returns(bool) {
        Agreement storage agreement = agreements[msg.sender];
        require(agreement.state == AgreementState.SELECTED, "Package state invalid: needed SELECTED");
        agreement.state = AgreementState.LISTED;
        return true;
    }

    // Delivery marked finished by courier
    function markDeliveryFinished(address _participant) public returns(bool) {
        Agreement storage agreement = agreements[_participant];
        require(agreement.state == AgreementState.PENDING_DELIVERY, "Package state invalid: needed PENDING_DELIVERY");
        require(agreement.courier == msg.sender, "Only the courier can mark the delivery as finished");
        agreement.state = AgreementState.DELIVERY_FINISHED;
        return true;
    }

    // Participant agrees to delivery being finished, and funds are sent to courier
    function agreeDeliveryFinished() public returns(bytes memory) {
        Agreement storage agreement = agreements[msg.sender];
        // Require courier to exist
        require(agreement.state == AgreementState.DELIVERY_FINISHED, "Package state invalid: needed DELIVERY_FINISHED");
        require(msg.sender == agreement.participant, "Only the participant can agree to the delivery being finished");
    
        address payable to = payable(agreement.courier);
        uint agreementCost = agreement.cost;
        (bool sent, bytes memory data) = to.call{value: agreementCost}("");
        require(sent, "Failed to send Ether");
        agreement.state = AgreementState.AGREEMENT_REACHED;
        return data;
    }
}