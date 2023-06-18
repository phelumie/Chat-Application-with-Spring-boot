export class UserSession {
    name: string;
    sessions: { [key: string]: Session };
  
    constructor(name: string, sessions: { [key: string]: Session }) {
      this.name = name;
      this.sessions = sessions;
    }
  
    getName(): string {
      return this.name;
    }
  
    getSession(sessionId: string): Session | undefined {
      return this.sessions[sessionId];
    }
  
    getSessions(): { [key: string]: Session } {
      return this.sessions;
    }
  
    hasSessions(): boolean {
      return Object.keys(this.sessions).length > 0;
    }
  }
  
  export interface Session {
    id: string;
    subscriptions: { [key: string]: Subscription };
  }
  
  export interface Subscription {
    destination: string;
  }
  
  const userSession = new UserSession(
    '349be323-1077-4ce5-a496-30d19b931799',
    {
      mrgpzusm: {
        id: 'mrgpzusm',
        subscriptions: {
          'sub-0': {
            destination: '/topic/messages/shege&shege'
          }
        }
      }
    }
  );
  