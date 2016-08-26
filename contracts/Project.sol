contract Project {

    address public beneficiary;
    uint public fundingGoal; uint public amountRaised; uint public deadline; uint public price;
    string public pName; string public pDesc;
    mapping(address => uint256) public balanceOf;
    bool fundingGoalReached = false;
    event GoalReached(address beneficiary, uint amountRaised);
    event FundTransfer(address backer, uint amount, bool isContribution);
    event ProjectCreated(address newProjectAddr);
    bool crowdsaleClosed = false;

    /*  at initialization, setup the owner */
    function Project(
    	string projectName,
    	string projectDesc,
        address ifSuccessfulSendTo,
        uint fundingGoalInEthers,
        uint durationInMinutes
    ) {
        beneficiary = ifSuccessfulSendTo;
        fundingGoal = fundingGoalInEthers * 1 ether;
        deadline = now + durationInMinutes * 1 minutes;
        pName = projectName;
        pDesc = projectDesc;
        ProjectCreated(this);
    }

	function fund(uint amount) internal{
        balanceOf[msg.sender] = amount;
        amountRaised += amount;
        //tokenReward.transfer(msg.sender, amount / price);
        FundTransfer(msg.sender, amount, true);
	}

	//transfer function
	function payout() internal{
        if (beneficiary.send(amountRaised)) {
            FundTransfer(beneficiary, amountRaised, false);
        } else {
            //If we fail to send the funds to beneficiary, unlock funders balance
            fundingGoalReached = false;
        }

	}

	function refund() internal{
        uint amount = balanceOf[msg.sender];
        balanceOf[msg.sender] = 0;
        if (amount > 0) {
            if (msg.sender.send(amount)) {
                FundTransfer(msg.sender, amount, false);
            } else {
                balanceOf[msg.sender] = amount;
            }
        }

	}

    /* The function without name is the default function that is called whenever anyone sends funds to a contract */
    function () {
        if (crowdsaleClosed) throw;
        fund(msg.value);
    }

    modifier afterDeadline() { if (now >= deadline) _ }

    /* checks if the goal or time limit has been reached and ends the campaign */
    function checkGoalReached() afterDeadline {
        if (amountRaised >= fundingGoal){
            fundingGoalReached = true;
            GoalReached(beneficiary, amountRaised);
        }
        crowdsaleClosed = true;
    }


    function safeWithdrawal() afterDeadline {
        if (!fundingGoalReached) {
        	refund();
        }

        if (fundingGoalReached && beneficiary == msg.sender) {
        	payout();
        }
    }

}

