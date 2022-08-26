module.exports = {
    jsonRes: (data,success = true) => {
        return {
            data,
            success
        }
    }
}
