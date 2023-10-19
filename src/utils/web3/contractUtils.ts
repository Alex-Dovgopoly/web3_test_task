import { JsonRpcProvider, Signer, ethers } from 'ethers';
import contractAbi from '../abi/testCitizens.json';


const sepoliaRpcUrl = process.env.REACT_APP_SEPOLIA_RPC_URL;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS!;

const provider = new JsonRpcProvider(sepoliaRpcUrl);

const parseEtherjsLog = (parsed: any) => {
    let parsedEvent: any = {}
    for (let i = 0; i < parsed.args.length; i++) {
        const input = parsed.fragment.inputs[i];
        const arg = parsed.args[i];
        const newObj = { ...input, ...{ "value": arg } };
        parsedEvent[input["name"]] = newObj;
    }
    return parsedEvent;
}


export async function fetchContractLogs() {
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);

    if (contract === undefined) return;

    const events = await contract.queryFilter("*", 0, 'latest');

    if (events.length === 0) return;

    let parsedEvents = []
    for (let event of events) {
        const parsedEvent = contract.interface.parseLog(event as any);
        const customParsed = parseEtherjsLog(parsedEvent);
        parsedEvents.push(customParsed);
    }

    if (parsedEvents.length !== 0) return parsedEvents;
}

export async function fetchNoteByCitizenId(citizenId: number) {
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);

    try {
        const result = await contract.getNoteByCitizenId(citizenId);

        return result;
    } catch (error) {
        console.error('Error call contract function:', error);
    }

}

type FormData = {
    name: string;
    age: number;
    city: string;
    note: string;
}

export async function createNewCitizen(formData: FormData, signer: Signer) {
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    try {
        const transaction = await contract.addCitizen(BigInt(formData.age), formData.city, formData.name, formData.note);

        // Check transaction approve
        const approveResponse = await provider.waitForTransaction(transaction.hash, 1, 150000).then((res) => {
            return res;
        });

        return approveResponse;

    } catch (error) {
        console.error('Error call contract function:', error);
    }

}