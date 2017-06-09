//
//  ViewController.swift
//  UIImageView
//
//  Created by tic40 on 6/21/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var Photo: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.Photo.image = UIImage(named: "image")
        self.Photo.layer.cornerRadius = self.Photo.frame.width / 2
        self.Photo.layer.masksToBounds = true
        self.Photo.layer.borderWidth = 2
        self.Photo.layer.borderColor = UIColor.blueColor().CGColor
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    

}

