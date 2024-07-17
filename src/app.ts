import { createApp } from "./utils/createApp";
import log from "./utils/logger";

const PORT = process.env.SERVER_PORT || 3002;

const app = createApp();

app.listen(PORT, async () => {
  log.info(`Listening at http://localhost:${PORT}`);
});
