package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
	"strings"
	"time"
	"regexp"
	"strconv"
)

func fetch(url string) string{
	fmt.Println("Fetch Url", url)
	client := &http.Client{}
	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36")
	resp, err := client.Do(req)
	if err != nil{
		fmt.Println("Http Get error", err)
	}
	if resp.StatusCode != 200 {
		fmt.Println("Http StatusCode ", resp.StatusCode)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Read error", err)
	}
	return string(body)
}

func parseUrls(url string){
	body := fetch(url)

	body = strings.Replace(body, "\n", "", -1)

	rp := regexp.MustCompile(`<div class="hd">(.*?)</div>`)
	titleRe := regexp.MustCompile(`<span class="title">(.*?)</span>`)
	idRe := regexp.MustCompile(`<a href="https://movie.douban.com/subject/(\d+)/"`)

	items := rp.FindAllStringSubmatch(body, -1)
	for _, item := range items {
		fmt.Println(idRe.FindStringSubmatch(item[1])[1], titleRe.FindStringSubmatch(item[1])[1])
	}
}
func main(){
	start := time.Now()
	
	for i := 0; i < 10; i++ {
		parseUrls("https://movie.douban.com/top250?start=" + strconv.Itoa(25*i))
	}

	elapsed := time.Since(start)
	fmt.Printf("Took %s\n", elapsed)
}