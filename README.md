# clean-chrome
*Clean Chrome* is a chrome extension that allows users to censor expletives on any webpage. With an active censor-toggle, the extension censors all expletives (sourced from [Wiktionary](https://en.wiktionary.org/wiki/Category:English_swear_words)) found on the active chrome tab.

<p align="center">
  <img src="/build/icons/sample_interface.png" alt="Sample Extension Interface" width="200"/>
</p>
                                                                                           
## **Technical Workflow**
React JS was used as the primary framework when creating the extension. Additionally, message passing was used to allow communication between content scripts and the extension via Chrome's API.

### **Creator**
[Lawrence Han](https://github.com/lawrencehhan)
