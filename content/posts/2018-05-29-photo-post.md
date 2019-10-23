+++
date = "2018-05-29T09:05:53+00:00"
draft = false
tags = ["python", "django", "crudlfap"]
title = "Photo post"
+++
![image](/img/2018-05-29-photo-post/12464f69e31d6e68baefcf11441943b47e14110e301427258cf150284123b1e1.png)

In the first screen we see that two posts in the list have a different button in the Actions column. The first row is a post that I'm the owner of, therefore the Actions shows a button for a dropdown menu. The second row is a post that I'm not owner of, but that has been published, so, I only have the detail link on that row. In the second screenshot, using the checkboxes reveals possible groupped actions on the bottom of the screen, here "Delete objects" which serves as reference action. In the third screenshot, we see how the DeleteObjects view relied on a secure queryset which only shows posts I'm owner of. It also draws a message about the post that I don't own, and that I have checked for delete. Note that this is the feature that comes only in closed-source django-material, which we cannot use in Open Source governmental projects unfortunnately.
