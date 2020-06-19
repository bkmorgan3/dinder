# dinder


<div className="form-container">
          <form>
            <h2>A Form</h2>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              id="password"
            />
            {signUp && (
              <div>
                <label htmlFor="email"></label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  name="email"
                />
              </div>
            )}
          </form>

        </div>