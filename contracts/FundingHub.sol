import "./Project.sol";

contract FundingHub {

	string public fundingHubName;
	event ProjectCreated(string pName, string pDesc, address pAddr, uint pGoal, uint pDeadline);
	event ProjectContributedTo(address pcAddr, uint pcAmount);

	function FundingHub(string fhName) {
		fundingHubName = fhName;
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
		address p = address(new Project(name, desc, successAddr, fundingGoal, durationMin));
		uint theDeadline = now + durationMin * 1 minutes;

		projects[p] = FHProjects({
			amountToBeRaised: fundingGoal,
			deadline: theDeadline,
			nameOfProject: name,
			descOfProject: desc
		});
		ProjectCreated(name, desc, p, fundingGoal, theDeadline);
	}

	function contribute(address projectAddress, uint amountToContribute) {
		projectAddress.send(amountToContribute);
		ProjectContributedTo(projectAddress, amountToContribute);
	}

}