import dotenv from "dotenv";
dotenv.config();
import { SecurePathBorder } from "./utils/SecurePathBorder";

const main = async () => {
	SecurePathBorder.startScheduledBorderCheck();
};

main();
