const { createRole, getRole, getAllRoles } = require('./repository')

module.exports = class Role {
    static async createRole (role, description) {
            const existingRole = await Role.getRole(role)
            if (existingRole){
                throw new Error("Role already exists")
            }
            
            return await createRole(role, description)
    }

    static async getRole(role) {
        return await getRole(role)
    }

    static async getAllRoles() {
        return await getAllRoles()
    }
}