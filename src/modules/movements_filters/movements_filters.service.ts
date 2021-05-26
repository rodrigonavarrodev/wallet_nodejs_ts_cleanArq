import { CRUD } from '../../common/interfaces/crud.interface'
import debug from 'debug'
import MovementsFilterDao from './movements_filters.dao';

const log: debug.IDebugger = debug("app:movementsfilter-service");

class MovementsFilterService implements CRUD {

    async create() {
        return '';
      }
    
    async createFilter(resource: MovementsFilterModel.createMovementsFilter) {
      return MovementsFilterDao.create(resource)
    }

    async getAll() {
      return MovementsFilterDao.getAll()
    }

    async findById(id: string) {
      return MovementsFilterDao.findById(id)
    }

}

export default new MovementsFilterService();
