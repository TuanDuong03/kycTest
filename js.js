import { HyperKycConfig } from "hyperverge-web-sdk";
// Mock blockchain ledger for demo purposes
const mockBlockchainLedger = [];

function addToBlockchain(transactionId, kycResult) {
    const timestamp = new Date().toISOString();
    const block = {
        transactionId,
        kycResult,
        timestamp,
        hash: btoa(transactionId + timestamp) // Simple base64 hash for demo
    };
    mockBlockchainLedger.push(block);
    return block;
}

function displayResult(message, block = null) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    if (block) {
        resultDiv.innerHTML += `<br><strong>Blockchain Record:</strong><br>Transaction ID: ${block.transactionId}<br>Result: ${JSON.stringify(block.kycResult)}<br>Timestamp: ${block.timestamp}<br>Hash: ${block.hash}`;
    }
}



function startOnboarding() {
    const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdDR3ZmQiLCJ3b3JrZmxvd0lkIjoid29ya2Zsb3dfZWt5YyIsImFkbWluIjp0cnVlLCJpYXQiOjE3NTYzNjQxNzAsImV4cCI6MTc1NjM2Nzc3MH0.QzBq13GOSHKM8ew-4hOV8oqpjwRoJ3JH2HlFzjTjayM"
    const hyperKycConfig = new HyperKycConfig(
        accessToken,
        true,
    );
    console.log("hyperKycConfig", hyperKycConfig);
    HyperKYCModule.launch(hyperKycConfig, handler);
}

const handler = (HyperKycResult) => {
    if (HyperKycResult.Cancelled) {
        // user cancelled
        console.log(HyperKycResult.Cancelled);
    } else if (HyperKycResult.Failure) {
        // failure
        console.log(HyperKycResult.Failure);
    } else if (HyperKycResult.Success) {
        // success
        console.log(HyperKycResult.Success);
    }
}
