import "./Project.sol";

contract FundingHub {

	string public hubName;
	event ProjectCreated(string pName, string pDesc, address pAddr);
	event ProjectContributedTo(address pcAddr, uint pcAmount);

	function FundingHub() {
		hubName = "FugueWeb Funding Hub";
	}

	// array of ProjectInfo structs
	mapping(address => FHProjects) public projects;

	struct FHProjects {
		uint256 amountToBeRaised;
		uint deadline;
		string nameOfProject;
		string descOfProject;
	}

	function createProject(string name, string desc, address successAddr, uint fundingGoal, uint durationMin) {
		Project project = new Project(name, desc, successAddr, fundingGoal, durationMin);
		uint theDeadline = now + durationMin * 1 minutes;

		projects[project] = FHProjects({
			amountToBeRaised: fundingGoal,
			deadline: theDeadline,
			nameOfProject: name,
			descOfProject: desc
		});
		ProjectCreated(name, desc, project);
	}

	function contribute(address projectAddress, uint amountToContribute) {
		projectAddress.send(amountToContribute);
		ProjectContributedTo(projectAddress, amountToContribute);
	}

}