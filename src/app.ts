import { createServer } from "./Utilities/Server";

createServer()
    .then(server => {
        server.listen(
            3000,
            () => {
                console.info('Listening on port 3000');
            }
        )
    })
    .catch(err => console.error(err));
    