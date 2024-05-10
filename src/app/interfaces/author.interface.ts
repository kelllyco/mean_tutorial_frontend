import { Injectable } from "@angular/core";
import { Author } from "../models/author.model";

@Injectable({
    providedIn: "root"
}) 

export abstract class AuthorDictionary {
    [index: string]: Author;
}