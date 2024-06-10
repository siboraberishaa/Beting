

export const checkPermissions = (pageName, operationName) => {
    let user = JSON.parse(localStorage.getItem('userInfo') || {})
    if (user.isAdmin) {
      return true
    }
    if (user?.permissions?.[pageName]?.[operationName]) {
      return true
    } else {
      return false
    }
  }
  
  
  export const checkAnyTrue = (pageName) => {
    let user = JSON.parse(localStorage.getItem('userInfo') || {})
    if (user.isAdmin) {
      return true
    }
    const permissions = user?.permissions?.[pageName] 
    if (permissions) {
      
    if (permissions.read || permissions.create || permissions.update || permissions.delete) {
      return true 
    } else {
      return false
    }
    } else {
      return false
    }
  }