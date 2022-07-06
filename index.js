var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xFA92c09bdbE5DbB733eE3abF5d6C128a126863Ed";

$(document).ready(async function(){
    if (window.ethereum) {    
        await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(function(accounts){
            user = accounts[0];
            instance = new web3.eth.Contract(abi, contractAddress, user);
            // console.log(instance);
            
            instance.methods.name().call((err, result) => { 
                if(err){
                    console.log(err);
                }
                else{
                    $("#tokenName").text(result);
                }
            });
            instance.methods.symbol().call((err, result) => { 
                if(err){
                    console.log(err);
                }
                else{
                    $("#tokenSymbol").text(result);
                }
            });
            instance.methods.totalSupply().call((err, result) => { 
                if(err){
                    console.log(err);
                }
                else{
                    $("#circulatingSupply").text(web3.utils.fromWei(result, 'ether'));
                }
            });
            instance.methods.minimumSupply().call((err, result) => { 
                if(err){
                    console.log(err);
                }
                else{
                    $("#minimumSupply").text(web3.utils.fromWei(result, 'ether'));
                }
            });
            instance.methods.maximumSupply().call((err, result) => { 
                if(err){
                    console.log(err);
                }
                else{
                    $("#maximumSupply").text(web3.utils.fromWei(result, 'ether'));
                }
            });
    
            $("#accountAddress").text(user);
    
            instance.methods.balanceOf(user).call((err, result) => { 
                if(err){
                    console.log(err);
                }
                else{
                    $("#accountBalance").text(web3.utils.fromWei(result, 'ether'));
                }
            });
        });     
    }
});

async function mintToken() {
    var address = $('#mintAddress').val();
    var amount = $('#mintAmount').val();
    //console.log("Minting " + amount);

    if (window.ethereum) {    
        await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(function(accounts){
            web3 = new Web3(Web3.givenProvider);
            user = accounts[0];

            instance.methods.mint(address, web3.utils.toWei(amount)).send({from:user}, function(error, txnhash){
                if(error)
                    $('#message').html(error);
                else
                {
                    $('#message').html('Transaction created at : ' + txnhash);
                }
            });
        });     
    }
  }