import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})

export class LanguageService {
    
    constructor(private translate: TranslateService){
        const savedLanguage = localStorage.getItem('language') || 'es'
        this.translate.setDefaultLang('es')
        this.translate.use(savedLanguage)
    }

    changeLanguage(language: string){
        this.translate.use(language)
    }

    getCurrentLanguage(){
        return this.translate.currentLang;
    }

    getAvailableLanguages(){
        return ['es', 'ck']
    }
}