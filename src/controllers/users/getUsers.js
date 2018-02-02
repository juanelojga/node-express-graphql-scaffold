import { User } from './../../models'
import _ from 'lodash'

class GetUsers {
  handle (req, res, next) {
    User.findAll()
    .then(users => {
      res.json({
        data: _.map(users, (user) => {
          return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
          }
        })
      })
    })
  }
}

export default GetUsers
