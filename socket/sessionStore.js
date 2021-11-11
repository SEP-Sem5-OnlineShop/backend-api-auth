const {createClient} = require("redis")
const redisClient = createClient()
module.exports = class InMemorySessionStore {
    constructor() {
        this.sessions = new Map();
    }

    findSession(id) {
        // return this.sessions.get(id);
        return JSON.parse(redisClient.get(id))
    }

    saveSession(id, session) {
        // this.sessions.set(id, session);
        redisClient.set(id, JSON.stringify(session))
    }

    findAllSessions() {
        return [...this.sessions.values()];
    }
}