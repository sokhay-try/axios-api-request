# axios-client-api

HTTP client powered by axios.


## Installation

```
npm i axios-client-api

yarn add axios-client-api
```

## Quick start

- Create resource module in your utils folder

  ```ts
  // utils/apiBuilder.ts
  import { ApiRequestBuilder } from 'axios-client-api'

  const apiRequestBuilder = new ApiRequestBuilder({
    baseURL: 'http://localhost:3000'
  })
  
  // Set authorization    
  apiRequestBuilder.axiosInstance.interceptors.request.use((config) => {
   const token = localStorage.getItem('accessToken')
   config.headers['Authorization'] = token ? `Bearer ${token}` : ''
   return config
  })  
  
  ```

- Using api builder

  ```ts
  // api/login.js
  import { apiRequestBuilder } from 'utils/apiBuilder'

  const loginResource = apiRequestBuilder.setUrl('/login')
  
  const { data } = await loginResource.create({ data: {'username': 'admin', 'password': 'admin'} })
  // sends POST http://localhost:3000/login with body {'username': 'admin', 'password': 'admin'}
 
  const getUsers = apiRequestBuilder.setUrl('/users')
  const { data } = await getUsers.get()
  // sends GET http://localhost:3000/users
 
```