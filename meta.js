module.exports = {
    prompts: {
        name: {
            type: "string",
            required: true,
            label: "Project name"
        },
        description: {
            type: "string",
            required: true,
            label: "Project description",
            default: "A Vue.js project"
        },
        author: {
            type: "string",
            label: "Author"
        },
        needClient: {
            type: "boolean",
            label: "Need a client?"
        },
        needServer: {
            type: "boolean",
            label: "Need a server?"
        }
    },
    "filters": {
        "client/**/*": "needClient",
        "server/**/*": "needServer"
    },
    complete(data, {helpers, logger}){
        if (!data.inPlace) {
            if (!data.needClient && !data.needServer) {
                logger.log('Not generating any files as you didn\'t want a client or server.');
            } else {
                const exec = require('child_process').exec;
                clientGit = `${data.needClient ? `cd ${data.destDirName}/client && git init && cd ../..` : ''}`;
                serverGit = `${data.needServer ? `cd ${data.destDirName}/server && git init && cd ../..` : ''}`;
                exec(`${clientGit} && ${serverGit}`, (error, stdout, stderr) => {
                    exec('echo $(pwd)', (error, stdout, stderr) => {
                        if (error) {
                            logger.log(`exec error: ${error}`);
                            return;
                        }
                    });
                    logger.log(`To get started:\n\n  cd ${data.destDirName}\n  yarn install\n  yarn start-dev`);
                });
            }
        }
    },
    helpers: {
        secret() {
            return Math.random().toString(36).substr(2);
        }
    },
    skipInterpolation: "**/*.vue"
}
