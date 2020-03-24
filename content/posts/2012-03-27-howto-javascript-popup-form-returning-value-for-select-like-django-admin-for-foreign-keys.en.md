+++
date = "2012-03-27T08:00:00+00:00"
draft = false
tags = ["php", "django", "javascript"]
title = "Howto: javascript popup form returning value for select like Django admin for foreign keys"
author = "jpic"
+++

This article presents a technique to get the return value of a form opened in a
javascript popup, like Django admin for foreign keys. It can be used to improve
the ergonomy relation select inputs.

#### Introduction

When a form allows to create or edit data, many to one (n:1) relations choices
are often presented in a select input. For example, Django admin uses a select
field by default for foreign keys.

Next to the select field, it is ergonomic to display a like with title “Add
another”, that opens the creation form for a new related object. The creation
form can be opened as a popup that, once submited, closes and adds a selected
option to the select field.

#### Requirements

This kind of link needs a class, for example “add-another”.

5 technically interesting javascript functions are required:

 - `showAddAnotherPopup()` which is bound to the click event of a.add-another
 - `dismissAddAnotherPopup()` which is actually called by the popup when the
   form is submitted
 - `id_to_windowname()` which converts the select field id to a window name
   compatible with IE
 - `windowname_to_id()` which converts a window name to the corresponding
   select field id
 - `html_unescape()` which converts some html entities to their corresponding
   characters

#### Flow

First, the “add-another” button is clicked, which triggers
`showAddAnotherPopup()`:

 - `showAddAnotherPopup()` uses the “add-another” id attribute to get the
   `name` attribute of the corresponding select field
 - it appends a `popup=1` GET variable to the `href` attribute of the link
 - it also appends a `winName` GET variable to the “add-another” link, which
   value is the select field name converted to a cross browser window name
 - it opens the window in a popup and focuses on it

When the user input in the popup is valid, then the form of the popup is saved
and the action should return a call to `opener.dismissAddAnotherPopup()` with
arguments: `window` (the popup), the future option’s value (ie. `id`) and string
representation (ie. `name`):

 - the option value and representation are unescaped
 - the popup window name is converted to the corresponding select input html id
 - the option is created with the appropriate value and inner html
 - the option is selected
 - the popup window is closed

The best way to understand the concept is still to practice, an existing
implementation can be understood with Firebug’s javascript debugger.

#### Example

In our example, “valueAttribute” is the name of the related object’s key that
should be the “value” of the select option (ie. “id”), and “displayAttribute”
is the name of the attribute which should be used as inner HTML of the option
(ie. “name” contains a good string representation of the related object).

Example HTML using Uni-form:


{{< highlight  html>}}
<div class="ctrlHolder">;
    <label for="profile"><em>*</em> Profile</label>

        <select class="required " name="recipe.recipe[profile]" id="id_recipe__dot__recipe__braceleft__profile__braceright__">
            <option value="29362F95-A80E-102D-9263-003048D8A48A">Marc Veyrat</option>
            <option value="AF98753D-A80E-102D-9263-003048D8A48A">Paul Bocuse</option>
        </select>
   <p class="formHint">
       <a class="add-another" id="add_id_recipe__dot__recipe__braceleft__profile__braceright__" href="/profile/create?displayAttribute=name&amp;valueAttribute=id">Click here to create a new profile</a>, if your choice isn't in the list.
   </p>
</div>
{{< / highlight >}}


Example Javascript code with jQuery for the event binding:


{{< highlight  js>}}
$(document).ready(function() {
    $( '.add-another' ).click(function(e) {
        e.preventDefault(  );
        showAddAnotherPopup( $( this ) );
    });
});

/* Credit: django.contrib.admin (BSD) */

function showAddAnotherPopup(triggeringLink) {
    /*

    Pause here with Firebug's script debugger.

    */
    var name = triggeringLink.attr( 'id' ).replace(/^add_/, '');
    name = id_to_windowname(name);
    href = triggeringLink.attr( 'href' );

    if (href.indexOf('?') == -1) {
        href += '?popup=1';
    } else {
        href += '&popup=1';
    }

    href += '&winName=' + name;

    var win = window.open(href, name, 'height=500,width=800,resizable=yes,scrollbars=yes');
    win.focus();

    return false;
}

function dismissAddAnotherPopup(win, newId, newRepr) {
    // newId and newRepr are expected to have previously been escaped by
    newId = html_unescape(newId);
    newRepr = html_unescape(newRepr);
    var name = windowname_to_id(win.name);
    var elem = document.getElementById(name);

    if (elem) {
        if (elem.nodeName == 'SELECT') {
            var o = new Option(newRepr, newId);
            elem.options[elem.options.length] = o;
            o.selected = true;
        }
    } else {
        console.log("Could not get input id for win " + name);
    }

    win.close();
}

function html_unescape(text) {
 // Unescape a string that was escaped using django.utils.html.escape.
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#39;/g, "'");
    text = text.replace(/&amp;/g, '&');
    return text;
}

// IE doesn't accept periods or dashes in the window name, but the element IDs
// we use to generate popup window names may contain them, therefore we map them
// to allowed characters in a reversible way so that we can locate the correct
// element when the popup window is dismissed.
function id_to_windowname(text) {
    text = text.replace(/\./g, '__dot__');
    text = text.replace(/\-/g, '__dash__');
    text = text.replace(/\[/g, '__braceleft__');
    text = text.replace(/\]/g, '__braceright__');
    return text;
} 

function windowname_to_id(text) {
    return text;
}
{{< / highlight >}}


Finally, the html which should be returned by the popup when the object is
saved:


{{< highlight html>}}
<script type="text/javascript">opener.dismissAddAnotherPopup( window, "name", "id" );</script>
{{< / highlight >}}


Example generic PHP usage:


{{<highlight php>}}
if ( isset( $this->request->variables['popup'] ) ) { 
    $result->variables['responseBody'] = sprintf( 
        '<script type="text/javascript">opener.dismissAddAnotherPopup( window, "%s", "%s" );</script>',
        $form[$this->request->variables['valueAttribute']], // "id" is the value attribute
        $form[$this->request->variables['displayAttribute']] // "name" is the display attribute
    );  
}
{{< / highlight >}}

