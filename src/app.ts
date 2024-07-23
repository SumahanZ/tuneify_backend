import env from "./env";
import connectDB from "./utils/connectDB";
import { createApp } from "./utils/createApp";
import log from "./utils/logger";

const app = createApp();

const PORT = env.SERVER_PORT || 3002;

app.listen(PORT, async () => {
  log.info(`Listening at http://localhost:${PORT}`);
  await connectDB();
});
