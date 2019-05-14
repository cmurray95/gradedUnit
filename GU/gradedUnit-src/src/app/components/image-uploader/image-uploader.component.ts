import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
const URL = "http://localhost:4000/users/upload";

@Component({
  selector: "app-image-uploader",
  templateUrl: "./image-uploader.component.html",
  styleUrls: ["./image-uploader.component.css"]
})
export class ImageUploaderComponent implements OnInit {
  // declare a property called fileuploader and assign it to an instance of a new fileUploader.
  // pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "photo"
  });
  // This is the default title property created by the angular cli. Its responsible for the app works
  title = "app works!";

  ngOnInit() {
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }
  // declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  constructor(private http: HttpClient, private el: ElementRef) {}
  // the function which handles the file upload without using a plugin.
  upload() {
    // locate the file element meant for the file upload.
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
      "#photo"
    );
    // get the total amount of files attached to the file input.
    const fileCount: number = inputEl.files.length;
    // create a new fromdata instance
    const formData = new FormData();
    // check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) {
      // a file was selected
      // append the key name 'photo' with the first file in the element
      formData.append("photo", inputEl.files.item(0));
      // call the angular http method
      this.http
        // tslint:disable-next-line: max-line-length
        // post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        .post(URL, formData)
        .map((res: Response) => res.json())
        .subscribe(
          // map the success function and alert the response
          success => {
            alert(success);
          },
          error => alert(error)
        );
    }
  }
}
