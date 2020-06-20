# dinder




        <main>
          <div className='modal'>
            <img
              className='img-main'
              src={businessList.imageURL}
              onClick={this.showMoreDetail}
            />
            <div className='button-group'>
              <button
                className='fav'
                onClick={() => {
                  addFav();
                }}
              >
                <i className='fa fa-heart'></i>
              </button>
              <button
                className='next'
                onClick={() => {
                  moveNext();
                }}
              >
                <i className='fa fa-times'></i>
              </button>
            </div>
          </div>
        </main>