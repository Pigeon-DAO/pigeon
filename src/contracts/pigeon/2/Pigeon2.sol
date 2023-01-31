// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;


contract Pigeon {
    address constant zeroAddress = 0x0000000000000000000000000000000000000000;

    struct Package {
        uint packageId;
        User owner;
        string pickupAddress;
        string dropoffAddress;
    }

    struct User { 
        address userAddress;
        string userName;
    }

    struct courierInformation {
        string courierName;
        address courierAddress;
    }

    Package[] packages;

     mapping(uint => Package) public idToPackage;

    function createPackage(string memory _userName, string memory _pickupAddress, string memory _dropoffAddress) public returns (Package memory, uint id) {
        User memory user = User(
            msg.sender,
            _userName
        );
        uint hashedPackageId = hashPackage(
            _userName,
            _pickupAddress,
            _dropoffAddress
        );
        Package memory newPackage = Package(
            hashedPackageId,
            user,
            _pickupAddress,
            _dropoffAddress
        );

        packages.push(newPackage);

        idToPackage[hashedPackageId] = newPackage;

        return (newPackage, hashedPackageId);
    }

    function getPackages() public view returns(Package[] memory) {
        return packages;
    }

    function hashPackage(
        string memory _userName,
        string memory _pickupAddress,
        string memory _dropoffAddress

    ) private view returns (uint) {
        bytes32 hash = keccak256(
            bytes(
                abi.encodePacked(
                    block.timestamp,
                    msg.sender,
                    _userName,
                    _pickupAddress,
                    _dropoffAddress
                )
            )
        );
        return uint(hash);
    }
}