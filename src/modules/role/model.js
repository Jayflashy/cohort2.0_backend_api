const { createRole, getRole, getAllRoles, checkRole, updateRole } = require('./repository')

module.exports = class Role {
    static async createRole (role, email, description) {
            const existingRole = await Role.checkRole(role, email)
            if (!existingRole){
                throw new Error("User with he same role already exists")
            }
            
            return await createRole(role, email, description)
    }

    static async checkRole(role, email) {
        let user = await getRole( role, email ) 
        if (user) {
            return true
        }
        return false
    }

    static async getAllRoles() {
        return await getAllRoles()
    }

    static async verifyRole(role, email) {
        let user = await checkRole( role, email ) 
        if (!user) {
            return false
        }
        return user
    }
    static async updateRole (role, email){
        let update = await updateRole(role, email)
        if(!user){
            return false
        }
        if(user){
            return true
        }
         await update()
    } 

}