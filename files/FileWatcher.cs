using System;
using System.IO;
using System.Reflection;

public class FileWatcher
{
    static string folderPath => Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
    
    static void Main(string[] args)
    {
        // 监听文件夹中的文件变化
        FileSystemWatcher watcher = new FileSystemWatcher(folderPath);
        watcher.IncludeSubdirectories = false;
        watcher.EnableRaisingEvents = true;

        // 当文件发生变化时触发事件处理程序
        watcher.Changed += OnChanged;

        Console.WriteLine("Watching for changes in folder: " + folderPath);
        Console.ReadLine(); // 阻塞主线程，保持监听状态
    }
    
    static void OnChanged(object sender, FileSystemEventArgs e)
    {
        // 当文件更新时，生成 HTML 文件
        string[] files = Directory.GetFiles(folderPath);

        // 创建 HTML 文件并写入文件列表
        string htmlContent = "<html><head><title>File List</title></head><body><ul>";
        
        foreach (string file in files)
        {
            htmlContent += "<li>" + file + "</li>";
        }
        
        htmlContent += "</ul></body></html>";

        // 保存 HTML 文件到指定路径
        string outputPath = folderPath + "\filelist.html";
        File.WriteAllText(outputPath, htmlContent);

        Console.WriteLine("HTML file generated: " + outputPath);
    }
}