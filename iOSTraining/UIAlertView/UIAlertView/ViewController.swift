//
//  ViewController.swift
//  UIAlertView
//
//  Created by tic40 on 6/20/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        var Alert:UIAlertView = UIAlertView(title: "Test", message: "Hello world", delegate: self, cancelButtonTitle: "OK")
        Alert.show()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

