import OperationModel from '../models/operation.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';

export default class BookmarksController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }
}