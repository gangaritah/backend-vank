

class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    register = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.userService.register(req.body)
            });
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    login = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.userService.login(req.body)
            });
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    profile = async (req, res) => {
        try {
            return res.status(200).json({
                data: await this.userService.profile(req.userEmail)
            });
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
}


export default UserController;