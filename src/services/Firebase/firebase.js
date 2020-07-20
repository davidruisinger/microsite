const config = {
  apiKey: process.env.GATSBY_API_KEY,
  authDomain: process.env.GATSBY_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_DATABASE_URL,
  projectId: process.env.GATSBY_PROJECT_ID,
  storageBucket: process.env.GATSBY_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID
}

class Firebase {
  constructor(app) {
    !app.apps.length ? app.initializeApp(config) : app.app()

    /* Helper */

    this.serverValue = app.database.ServerValue

    /* Firebase APIs */

    this.auth = app.auth()
    this.db = app.database()
  }

  // *** Public Profiles API ***

  public_profiles = () => this.db.ref("public_profiles")
}

let firebase

function getFirebase(app, auth, database) {
  if (!firebase) {
    firebase = new Firebase(app, auth, database)
  }

  return firebase
}

export default getFirebase
