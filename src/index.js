import { Application } from "stimulus"
import Turbolinks from "turbolinks"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import Api from "./api.js"

const turbolinks = Turbolinks
const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
turbolinks.start()
