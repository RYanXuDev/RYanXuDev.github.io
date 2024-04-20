# UI 工具包新功能·Part 2

## 引言

Yes, indeed!  
Unity的UI工具包 (UI ToolkitUI) 在2023.2版本之后引入了一些关键的新功能。  
本教程将涵盖其中最主要的改进内容，包括：

- 新的数据绑定 (Data Binding) 方式
- 简化的自定义控件 (Custom Control) 创建方式
- 一些新特性 (Attribute) 的使用方法

本教程将结合实际案例来详细的讲解这些新的功能。

---

示例工程文件下载

- [Patreon](https://www.patreon.com/posts/unity-ui-toolkit-102677647?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link)
- [爱发电](https://afdian.net/p/379c052cfe9311ee8c5652540025c377)

---

本教程由三个部分组成，这是第二部分，主要内容是：
- CreateProperty 与 DontCreateProperty 这两个新特性的作用
- 新的数据绑定方法其中之一：在 UXML 里绑定数据
- 新的数据绑定方法其中之一：通过C#进行实时数据绑定

## 新特性：CreateProperty 与 DontCreateProperty

OK，现在我们学会了如何绑定 SO 里的数据了。  
我们来绑定剩下的几个 UI 元素。

## 在UXML里添加数据绑定

在新版本的UXML文件当中，开发者可以直接手动添加DataBinding来实现和UI Builder中的数据绑定相同的效果。
这种方式使得开发者可以更加精细地控制数据绑定的逻辑和效果。

## 在C#里调用VisualElement.SetBinding()方法进行数据绑定

在Unity 2023.2(或更高)版本的C#代码当中，开发者可以调用VisualElement.SetBinding()方法来为UI元素添加数据绑定。
这种方法使得在代码中动态地管理数据绑定成为可能，为开发者提供了更多的灵活性和控制权。
