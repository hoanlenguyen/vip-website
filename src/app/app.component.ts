import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'vip-app-root',
    template: `
    	<tui-root>
            <router-outlet></router-outlet>
        </tui-root>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPAppComponent {}