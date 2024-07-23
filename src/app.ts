import connectDB from "./utils/connectDB";
import { createApp } from "./utils/createApp";
import log from "./utils/logger";
import { env } from "./env";

const PORT = env.SERVER_PORT || 3002;

const app = createApp();

app.listen(PORT, async () => {
  log.info(`Listening at http://localhost:${PORT}`);
  await connectDB();
});
