import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LanguageService {

  constructor(private translate: TranslateService){
    const savedLanguage = localStorage.getItem('language') || 'es'
    this.translate.use(savedLanguage)
  }

  changeLanguage(language: string):Observable<any>{
    localStorage.setItem('language', language)
    return this.translate.use(language)
  }

  getCurrentLanguage(){
    return this.translate.currentLang;
  }

  getAvailableLanguages(){
    return ['es', 'en']
  }
}
