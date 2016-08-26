var accounts;
var account;
var balance;
var fh;
var projectsArray = [];
var projectIndex = 0;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
  document.getElementById("status").style.color = "green";
};

function setAddress() {
  //document.getElementById("p_address").innerHTML = Project.deployed().address;
  document.getElementById("f_address").innerHTML = FundingHub.deployed().address;
}

function createProject(){
  var projectName = document.getElementById("projectNameInput").value;
  var projectDescription = document.getElementById("projectDescInput").value;
  var projectUserAddr = document.getElementById("projectAddrInput").value;
  var projectAmountNeeded = document.getElementById("projectAmountInput").value;
  var projectMinutes = document.getElementById("projectMinutesInput").value;
  console.log(projectName, projectDescription, projectUserAddr, projectAmountNeeded, projectMinutes);

  fh.createProject(projectName, projectDescription, projectUserAddr, projectAmountNeeded, projectMinutes, {from:accounts[0]}).then(function(instance){
    console.log(instance);
    logTx("New Project contract deployed. Tx: " + instance);
    setStatus("Project created!");
    updateProjectList(projectIndex);
    projectIndex++;
  }).catch(function(error){
    console.log(error);
  });

  // Project.new(projectName, projectDescription, projectUserAddr, projectAmountNeeded, projectMinutes, {from:accounts[0]}).then(function(instance){
  //   console.log(instance);
  //   logTx("New Project contract deployed at " + instance.address);
  //   setStatus("Project created!");
  //   updateProjectList();
  // }).catch(function(error){
  //   console.log(error);
  // });
}

function updateProjectList(index){
  var tableData = "<tr><td>" + projectsArray[index].pName + "</td><td>" + projectsArray[index].pDesc + "</td><td>" + projectsArray[index].pAddr + "</td><td>" + projectsArray[index].pGoal.toNumber() + " ETH</td><td>" + timeConverter(projectsArray[index].pDeadline.toNumber()) + "</td></tr>";
  document.getElementById("browse-projects-table").innerHTML += tableData;
}

// function catchEvent(){
//   var fh = FundingHub.deployed();
//   var eProjectCreated = fh.ProjectCreated();
//   transfers.watch(function(error, result) {
//     // This will catch all Transfer events, regardless of how they originated.
//     if (error == null) {
//       console.log(result.args);
//     }
//   }
// }

function contribute(){
  var contributeAddr = document.getElementById("contributeAddrInput").value;
  var contributeAmount = document.getElementById("contributeAmountInput").value;
  console.log(contributeAddr, contributeAmount);

  fh.contribute(contributeAddr, contributeAmount, {from:accounts[0]}).then(function(result){
    console.log(result);
    logTx("Contribution to " + contributeAddr + " sent. Tx: " + result);
    setStatus("Contribution sent!");
  }).catch(function(error){
    console.log(error);
  });
}

function timeConverter(UNIX_timestamp){
  if (UNIX_timestamp == 0){
    return null;
  }
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function refreshBalances() {
  //document.getElementById("p_balance").innerHTML = web3.fromWei(web3.eth.getBalance(Project.deployed().address), "ether").toFixed(5);
  document.getElementById("f_balance").innerHTML = web3.fromWei(web3.eth.getBalance(fh.address), "ether").toFixed(5);
  document.getElementById("cb_balance").innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), "ether").toFixed(5)+ " ETH";
};

function logTx(text) {
  var tableData = "<tr><td>" + text + "</td></tr>";
  document.getElementById("transaction-table").innerHTML += tableData;
};


window.onload = function() {
  fh = FundingHub.deployed();

  web3.eth.getAccounts(function(err, accs) {
    console.log(accs);

    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    for (var i = 0; i < accs.length; i++) {
      document.getElementById("select-box").innerHTML += '<option>' + accs[i] + '</option>'
    }

    accounts = accs;
    account = accounts[0];

    setAddress();
    refreshBalances();

    var eProjectCreated = fh.ProjectCreated();
    eProjectCreated.watch(function(error, result) {
      // This will catch all events, regardless of how they originated.
      if (error == null) {
        //console.log(result.args);
        projectsArray.push(result.args);
        console.log(projectsArray);
        updateProjectList(projectIndex);
        projectIndex++;
      }
    });

    var eContribution = fh.ProjectContributedTo();
    eContribution.watch(function(error, result) {
      // This will catch all events, regardless of how they originated.
      if (error == null) {
        console.log(result.args);
        var text = "Project " + result.args.pcAddr + " received " + result.args.pcAmount + " ETH!";
        logTx(text);
        var audio = new Audio('../images/ca-ching.mp3');
        audio.play();
      }
    });

  });

  web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
    var transactionReceiptAsync;
    interval |= 500;
    transactionReceiptAsync = function(txnHash, resolve, reject) {
        try {
            var receipt = web3.eth.getTransactionReceipt(txnHash);
            if (receipt == null) {
                setTimeout(function () {
                    transactionReceiptAsync(txnHash, resolve, reject);
                }, interval);
            } else {
                resolve(receipt);
            }
        } catch(e) {
            reject(e);
        }
    };

    return new Promise(function (resolve, reject) {
        transactionReceiptAsync(txnHash, resolve, reject);
    });
  };
}
