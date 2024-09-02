// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }
    uint256 public numberOfCampaigns = 0;
    mapping(uint256 => Campaign) public campaigns;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _desc,
        uint256 _target,
        uint256 _deadline
    ) external {
        //require(block.timestamp < _deadline, "Deadline has passed");

        campaigns[numberOfCampaigns] = Campaign(
            _owner,
            _title,
            _desc,
            _target,
            _deadline,
            0,
            new address[](0),
            new uint256[](0)
        );
        numberOfCampaigns++;
    }

    function donateToCampaign(uint256 _id) external payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(uint256 _id) external view returns (address[] memory) {
        return campaigns[_id].donators;
    }

    function getDonations(
        uint256 _id
    ) external view returns (uint256[] memory) {
        return campaigns[_id].donations;
    }

    function getAllCampaigns() external view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            allCampaigns[i] = campaign;
        }

        return allCampaigns;
    }

    function deleteAllCampaigns() public {
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            delete campaigns[i];
        }
        numberOfCampaigns = 0;
    }

}
