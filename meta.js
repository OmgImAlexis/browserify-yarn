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
        }
    },
    complete(data) {
        if (!data.inPlace) {
            const exec = require('child_process').exec;
            exec(`cd ${data.destDirName} && yarn install`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            }).then(() => {
                console.log(`To get started:\n\n  cd ${data.destDirName}\n  yarn start`);
            });
        }
    },
    helpers: {
        secret() {
            return Math.random().toString(36).substr(2);
        }
    },
    skipInterpolation: "**/*.vue"
}
