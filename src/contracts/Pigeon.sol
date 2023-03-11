//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Courier is Ownable {

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

    event AgreementCreated(address indexed participant);
    event CourierSelectedAgreement(address indexed participant);
    event ParticipantAcceptedCourier(address indexed participant);
    event ParticipantRejectedCourier(address indexed participant); 
    event CourierMarkedDeliveryFinished(address indexed participant);
    event ParticipantAgreedDeliveryFinished(address indexed participant);

    uint collectedFees;

    function getAgreement(address _participant) public view returns (Agreement memory) {
        return agreements[_participant];
    }

    // THESE FUNCTIONS ARE LISTED IN ORDER OF EXPECTED FLOW BETWEEN THE PARTICIPANT AND COURIER

    // Participant creates the agreement
    function createAgreement(string memory _pickup, string memory _dropoff) public payable returns(bool) {
        require(msg.value > 0 wei, "You must put up a payment price.");
        agreements[msg.sender] = Agreement(_pickup, _dropoff, msg.value, msg.sender, address(0), AgreementState.LISTED);
        emit AgreementCreated(msg.sender);
        return true;
    }

    // Courier selects an agreement to deliver
    function selectAgreement(address _participant) public returns(bool) {
        Agreement storage agreement = agreements[_participant];
        require(agreement.state == AgreementState.LISTED, "Agreement state invalid: needed LISTED");
        agreement.courier = msg.sender;
        agreement.state = AgreementState.SELECTED;
        emit CourierSelectedAgreement(_participant);
        return true;
    }

    // Participant accepts courier
    // after this, delivery is expected
    function acceptCourier() public returns(bool) {
        Agreement storage agreement = agreements[msg.sender];
        require(agreement.state == AgreementState.SELECTED, "Agreement state invalid: needed SELECTED");
        agreement.state = AgreementState.PENDING_DELIVERY;
        emit ParticipantAcceptedCourier(msg.sender);
        return true;
    }

    function rejectCourier() public returns(bool) {
        Agreement storage agreement = agreements[msg.sender];
        require(agreement.state == AgreementState.SELECTED, "Agreement state invalid: needed SELECTED");
        agreement.state = AgreementState.LISTED;
        emit ParticipantRejectedCourier(msg.sender);
        return true;
    }

    // Delivery marked finished by courier
    function markDeliveryFinished(address _participant) public returns(bool) {
        Agreement storage agreement = agreements[_participant];
        require(agreement.state == AgreementState.PENDING_DELIVERY, "Agreement state invalid: needed PENDING_DELIVERY");
        require(agreement.courier == msg.sender, "Only the courier can mark the delivery as finished");
        agreement.state = AgreementState.DELIVERY_FINISHED;
        emit CourierMarkedDeliveryFinished(_participant);
        return true;
    }

    // Participant agrees to delivery being finished, and funds are sent to courier
    function agreeDeliveryFinished() public returns(bytes memory) {
        Agreement storage agreement = agreements[msg.sender];
        // Require courier to exist
        require(agreement.state == AgreementState.DELIVERY_FINISHED, "Agreement state invalid: needed DELIVERY_FINISHED");
        require(msg.sender == agreement.participant, "Only the participant can agree to the delivery being finished");
    
        address payable to = payable(agreement.courier);
        uint agreementCost = agreement.cost;
        // 10% fee
        // transfer remaining 90% to courier
        uint cost = agreementCost * 90 / 100;
        (bool sent, bytes memory data) = to.call{value: cost}("");
        require(sent, "Failed to send Ether");
        collectedFees += agreementCost * 10 / 100;
        agreement.state = AgreementState.AGREEMENT_REACHED;
        emit ParticipantAgreedDeliveryFinished(msg.sender);
        return data;
    }

    // --
    // END OF COURIER PROCESS
    // --

    function withdrawFees(address _to) public onlyOwner returns(bytes memory) {
        (bool sent, bytes memory data) = _to.call{value: collectedFees}("");
        return data;
    }
}