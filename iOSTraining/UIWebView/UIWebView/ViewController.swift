//
//  ViewController.swift
//  UIWebView
//
//  Created by tic40 on 6/26/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet var Web: UIWebView!
    let URL = "http://www.apple.com"

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        let URLRequest = NSURL(string: URL)
        let Request = NSURLRequest(URL: URLRequest!)
        Web.loadRequest(Request)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

