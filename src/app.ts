import dotenv from 'dotenv';
import OutageController from "./outages/outageController";

async function main() {
    dotenv.config();
    const outageController = new OutageController();

    const outages = await outageController.getOutages();

    console.log(outages.length);
    console.log(outages[0]);
}
  
if (require.main === module) {
    main();
}