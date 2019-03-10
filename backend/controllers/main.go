package controllers

import (

	//"golang.org/x/net/context"

	"strings"

	firebase "firebase.google.com/go"

	"google.golang.org/api/option"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
)

type MainController struct {
	beego.Controller
}

func Auth(c *context.Context) {
	beego.Debug("checking......")

	opt := option.WithCredentialsFile("credentials.json")
	app, err := firebase.NewApp(c.Request.Context(), nil, opt)
	if err != nil {
		beego.Debug("firebase.NewApp error.", err)
		c.Output.JSON(err, false, true)
	}
	auth, err := app.Auth(c.Request.Context())
	if err != nil {
		beego.Debug("Auth error.", err)
		c.Output.JSON(err, false, true)
	}
	// クライアントから送られてきた、JWTを取得
	authHeader := c.Request.Header.Get("Authorization")
	// beego.Debug("Authorization.", authHeader)

	// Token取得
	idToken := strings.Replace(authHeader, "Bearer ", "", 1)

	// JWT の検証
	token, err := auth.VerifyIDToken(c.Request.Context(), idToken)
	if err != nil {
		beego.Debug("VerifyIDToken error.", err)
		c.Output.JSON(err, false, true)
	}
	beego.Debug("Verified ID token: ", token)
}
