---
title: "How to use Go templates"
date: 2020-02-13T13:33:37+00:00
tags : ["go", "templates",]
draft: true
---

[ **Go’s html/template** ](https://golang.org) package provides a rich templating language for HTML templates. It is mostly used in web applications to display data in a structured way in a client’s browser. One great benefit of Go’s templating language is the automatic escaping of data. There is no need to worry about **XSS** attacks as Go parses the HTML template and escapes all inputs before displaying it to the browser.



<!--more-->

### Why build templates with **go** language?
 - it allows non-blocking requests and makes competition easy.
 - it facilitates code testing and deployment since it does not require installing any runtime or dependency environment.
 - it does not require installing a front-end HTTP server such as Apache or Nginx since it already embeds an excellent one in its standard library.
- it does not force you to use a web framework since all the tools required for web development are already available in the standard library.  
&nbsp;  

  

**Control Structures**

The templating language contains a rich set of control structures to render your HTML. Here you will get an overview of the most commonly used ones. To get a detailed list of all possible structures visit: text/template.  
&nbsp;
```
{{/* a comment */}} 	//Defines a comment
{{.}} 	                //Renders the root element
{{.Title}} 	            //Renders the “Title”-field in a nested element
{{if .Done}} {{else}} {{end}} 	//Defines an if-Statement
{{range .Todos}} {{.}} {{end}} 	//Loops over all “Todos” and renders each using {{.}}
{{block "content" .}} {{end}} 	//Defines a block with the name “content”
```
&nbsp;  

**Parsing Templates from Files**

Template can either be parsed from a string or a file on disk. As it is usually the case, that templates are pares from disk, this example shows how to do so. In this example there is a template file in the same directory as the Go program called layout.html.  

 

```
tmpl, err := template.ParseFiles("layout.html")
// or
tmpl := template.Must(template.ParseFiles("layout.html"))
```  
&nbsp;  

**Execute a Template in a Request Handler**

Once the template is parsed from disk it’s ready to be used in the request handler. The Execute function accepts an io.Writer for writing out the template and an interface{} to pass data into the template. When the function is called on an http.ResponseWriter the Content-Type is header is automatically set in the HTTP response to Content-Type: text/html; charset=utf-8.  

```
func(w http.ResponseWriter, r *http.Request) {
    tmpl.Execute(w, "data goes here")
}
```
--------------------------------------------------

### Here is an example

Create a file named "main.go".
First import "net/http" to able to launch server.  
 

```
import (
    "fmt"
	"io/ioutil"
	"net/http"
)
``` 
&nbsp;  

**definition of the page structure:**  
 

```
type Page struct {
    Title string
    Body  []byte
}
```  


The type []byte means "a byte slice". (See Slices: usage and internals for more on slices.) The Body element is a []byte rather than string because that is the type expected by the io libraries we will use, as you'll see below.

The Page struct describes how page data will be stored in memory. But what about persistent storage? We can address that by creating a save method on Page:  
&nbsp;  
```
func (p *Page) save() error {
    filename := p.Title + ".txt"
    return ioutil.WriteFile(filename, p.Body, 0600)
}
```  

This method's signature reads: "This is a method named save that takes as its receiver p, a pointer to Page . It takes no parameters, and returns a value of type error."

This method will save the Page's Body to a text file. For simplicity, we will use the Title as the file name.

 If all goes well, Page.save() will return nil (the zero-value for pointers, interfaces, and some other types).

The octal integer literal 0600, passed as the third parameter to WriteFile, indicates that the file should be created with read-write permissions for the current user only. 
&nbsp;  

**In addition to saving pages, we have to load pages:**  

```
func loadPage(title string) (*Page, error) {
    filename := title + ".txt"
    body, err := ioutil.ReadFile(filename)
    if err != nil {
        return nil, err
    }
    return &Page{Title: title, Body: body}, nil
}
```  

The function loadPage constructs the file name from the title parameter, reads the file's contents into a new variable body, and returns a pointer to a Page literal constructed with the proper title and body values.


Callers of this function can check the second parameter; if it is nil then it has successfully loaded a Page. If not, it will be an error that can be handled by the caller (see the language specification for details).  
&nbsp;  


**Let's write a main function:**  

```
func main() {
    p1 := &Page{Title: "TestPage", Body: []byte("This is a sample Page.")}
    p1.save()
    p2, _ := loadPage("TestPage")
    fmt.Println(string(p2.Body))
}
```  

After compiling and executing this code, a file named TestPage.txt would be created, containing the contents of p1. The file would then be read into the struct p2, and its Body element printed to the screen.

You can compile and run the program like this:
```
$ go build main.go
```
&nbsp;  

**About the server**  
```
package main

import (
    "fmt"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```  
The main function begins with a call to http.HandleFunc, which tells the http package to handle all requests to the web root ("/") with handler.

It then calls http.ListenAndServe, specifying that it should listen on port 8080 on any interface (":8080"). This function will block until the program is terminated.

ListenAndServe always returns an error, since it only returns when an unexpected error occurs. In order to log that error we wrap the function call with log.Fatal.

The function handler is of the type http.HandlerFunc. It takes an http.ResponseWriter and an http.Request as its arguments.

An http.ResponseWriter value assembles the HTTP server's response; by writing to it, we send data to the HTTP client.

An http.Request is a data structure that represents the client HTTP request. r.URL.Path is the path component of the request URL. The trailing [1:] means "create a sub-slice of Path from the 1st character to the end." This drops the leading "/" from the path name.  
&nbsp;  

**Let's create viewHandler**  
It will allow users to view a  page. It will handle URLs prefixed with "/view/".
```
func viewHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/view/"):]
    p, _ := loadPage(title)
    fmt.Fprintf(w, "<h1>%s</h1><div>%s</div>", p.Title, p.Body)
}
``` 

First, this function extracts the page title from r.URL.Path, the path component of the request URL. The Path is re-sliced with `[len("/view/"):]` to drop the leading "/view/" component of the request path. This is because the path will invariably begin with "/view/", which is not part of the page's title.

The function then loads the page data, formats the page with a string of simple HTML, and writes it to w, the http.ResponseWriter.

To use this handler, we rewrite our main function to initialize http using the viewHandler to handle any requests under the path /view/.  

```
func main() {
    http.HandleFunc("/view/", viewHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```    
&nbsp;  

**Let's create two new handlers:** 
One named editHandler to display an 'edit page' form, and the other named saveHandler to save the data entered via the form.

**First, we add them to main():**  

```
func main() {
    http.HandleFunc("/view/", viewHandler)
    http.HandleFunc("/edit/", editHandler)
    http.HandleFunc("/save/", saveHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```  


The function editHandler loads the page (or, if it doesn't exist, create an empty Page struct), and displays an HTML form.  

```
func editHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/edit/"):]
    p, err := loadPage(title)
    if err != nil {
        p = &Page{Title: title}
    }
}
```  

&nbsp;  

**The html/template package** is part of the Go standard library. We can use `html/template` to keep the HTML in a separate file, allowing us to change the layout of our edit page without modifying the underlying Go code.

First, we must add html/template to the list of imports. 
```
import (
	"html/template"
	"io/ioutil"
	"net/http"
)
```  

Let's create a template file containing the HTML form. Open a new file named `edit.html`, and add the following lines:  

```
<h1>Editing {{.Title}}</h1>

<form action="/save/{{.Title}}" method="POST">
<div><textarea name="body" rows="20" cols="80">{{printf "%s" .Body}}</textarea></div>
<div><input type="submit" value="Save"></div>
</form>
```  

Modify `editHandler` to use the template:  

```
func editHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/edit/"):]
    p, err := loadPage(title)
    if err != nil {
        p = &Page{Title: title}
    }
    t, _ := template.ParseFiles("edit.html")
    t.Execute(w, p)
}
```  

The function template.ParseFiles will read the contents of edit.html and return a *template.Template.

The method `t.Execute `executes the template, writing the generated HTML to the http.ResponseWriter. The .Title and .Body dotted identifiers refer to p.Title and p.Body.  


 Template directives are enclosed in double curly braces. The printf "%s" .Body instruction is a function call that outputs .Body as a string instead of a stream of bytes, the same as a call to fmt.Printf. The html/template package helps guarantee that only safe and correct-looking HTML is generated by template actions. For instance, it automatically escapes any greater than sign (>), replacing it with &gt;, to make sure user data does not corrupt the form HTML.

Since we're working with templates now, let's create a template for our viewHandler called view.html:  

```
<h1>{{.Title}}</h1>

<p>[<a href="/edit/{{.Title}}">edit</a>]</p>

<div>{{printf "%s" .Body}}</div>
```  

Modify `viewHandler` accordingly:
```
func viewHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/view/"):]
    p, _ := loadPage(title)
    t, _ := template.ParseFiles("view.html")
    t.Execute(w, p)
}
```  


Notice that we've used almost exactly the same templating code in both handlers. Let's remove this duplication by moving the templating code to its own function:
```
func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
    t, _ := template.ParseFiles(tmpl + ".html")
    t.Execute(w, p)
}
```  

And modify the handlers to use that function:
```
func viewHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/view/"):]
    p, err:= loadPage(title)
    if err != nil {
        http.Redirect(w, r, "/edit/"+title, http.StatusFound)
        return
    }
    renderTemplate(w, "view", p)
}

func editHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/edit/"):]
    p, err := loadPage(title)
    if err != nil {
        p = &Page{Title: title}
    }
    renderTemplate(w, "edit", p)
}
```  
The function `saveHandler` will handle the submission of forms located on the edit pages. After uncommenting the related line in main, let's implement the handler:  

```
func saveHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/save/"):]
    body := r.FormValue("body")
    p := &Page{Title: title, Body: []byte(body)}
    p.save()
    http.Redirect(w, r, "/view/"+title, http.StatusFound)
}
```  

The page title (provided in the URL) and the form's only field, Body, are stored in a new Page. The save() method is then called to write the data to a file, and the client is redirected to the /view/ page.

The value returned by FormValue is of type string. We must convert that value to []byte before it will fit into the Page struct. We use []byte(body) to perform the conversion.  

&nbsp;
**You can compile and run the program.**
```
$ go build main.go
$ ./main
```
