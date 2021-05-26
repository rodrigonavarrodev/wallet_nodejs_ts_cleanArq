import {CommonRoutesConfig} from './common/common.routes.config'
import { CvuAccountsRoutes } from './modules/cvu_accounts/cvu_accounts.routes.config'
import { TransfersRoutes } from './modules/transfers/transfers.routes.config'
import { MoneyTransferTypesRoutes } from './modules/money_transfer_type/money_transfer_types.routes.config'
import { MoneyDepositTypesRoutes } from './modules/money_deposit_type/money_deposit_types.routes.config'
import { FriendSaveTypesRoutes } from './modules/friend_save_type/friend_save_types.routes.config'
import { ExtractionOrderRoutes } from './modules/extraction_order/extraction_order.routes.config'
import { MovementsRoutes } from './modules/movements/movements.routes.config'
import {TermsRoutes} from './modules/terms/terms.routes.config'
import { AskMoneyRoutes } from './modules/ask_money/ask_money.routes.config'
import { MovementsFilterRoutes } from './modules/movements_filters/movements_filters.routes.config'
import {CvuAccountsBORoutes} from './modules/cvu_accountsbo/cvu_accountsbo.routes.config'

import debug from 'debug';

const debugLog: debug.IDebugger = debug('app:routes');

export default class Router {
    public static init(app: any): any {
        debugLog('Router - Start adding routes.');
        const routes: Array<CommonRoutesConfig> = [];
        
        routes.push(new MovementsFilterRoutes(app));
        routes.push(new AskMoneyRoutes(app));
        routes.push(new MovementsRoutes(app));
        routes.push(new CvuAccountsRoutes(app));
        routes.push(new TransfersRoutes(app));
        routes.push(new MoneyTransferTypesRoutes(app));
        routes.push(new MoneyDepositTypesRoutes(app));
        routes.push(new FriendSaveTypesRoutes(app));
        routes.push(new ExtractionOrderRoutes(app));
        routes.push(new TermsRoutes(app));
        routes.push(new CvuAccountsBORoutes(app));
            
        routes.forEach((route: CommonRoutesConfig) => {
            debugLog(`Routes configured for ${route.getName()}`);
        });
    
        return routes;
    }
}
