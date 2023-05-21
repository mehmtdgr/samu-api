const express = require("express");
const router = express.Router();

const graduationProjectController = require("../controllers/graduation-project.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/graduation-project.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");
const ROLES = require("../references/role.reference");

router
  .route("/")
  .post(
    authenticate,
    authorization([ROLES.ACADEMICIAN, ROLES.ADMIN]),
    validate(validationSchema.createGraduationProjectSchema),
    graduationProjectController.create
  );
router.route("/").get(authenticate, graduationProjectController.list);

module.exports = router;
