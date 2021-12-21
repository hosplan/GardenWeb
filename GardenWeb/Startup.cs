using GardenWeb.Data;
using GardenWeb.Helper;
using GardenWeb.HelperService;
using GardenWeb.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.Threading.Tasks;

namespace GardenWeb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            //var connectionString = Environment.GetEnvironmentVariable("Data Source=localhost,1443;Initial Catalog=GardenUserSDB;UserId=sa;Password=emth022944w!MultipleActiveResultSets=true");

            services.AddSignalR();

            //Email Setting
            services.Configure<MailSetting>(Configuration.GetSection("MailSettings"));
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IMailService, MailService>();
            services.AddTransient<IJWTService, JWTService>();
            //jwt
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.Events = new JwtBearerEvents()
                {
                    OnMessageReceived = context =>
                    {
                        if (context.Request.Headers.ContainsKey("Authorization"))
                        {
                            context.Token = context.Request.Headers["Authorization"];
                        }
                        else if (context.Request.Query.ContainsKey("token"))
                        {
                            context.Token = context.Request.Query["token"];
                        }

                        return Task.CompletedTask;
                    }
                };
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    //Issuer의 유효성 여부
                    ValidateIssuer = true,
                    //Audience의 유효성 여부
                    ValidateAudience = true,
                    //Token의 생명주기
                    ValidateLifetime = true,
                    //Token의 유효성을 검증
                    ValidateIssuerSigningKey = true,
                    //Token의 발행자
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    //청중을 지정한다 특별한 경우가 아니면 JWT인증을 수행하는 도메인 지정
                    ValidAudience = Configuration["Jwt:Audience"],
                    //Token을 발행할 암호화키 지정
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                    //시간을 확인할 대 적용할 클럭 스큐 단위 시간 설정
                    ClockSkew = TimeSpan.Zero
                };
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("RoleGrade", policy =>
                    policy.Requirements.Add(new MinimumGradeRequirement(3)));
            });
            //해쉬 서비스 추가
            services.AddTransient<HashService, HashService>();
            services.AddScoped<IAuthorizationHandler, MinimumGradeHandler>();
            services.AddDbContext<GardenWebContext>(options =>
            options.UseSqlServer("Server=192.168.0.10,1433;Database=GardenUserSDB;User Id=SA;Password=emth022944w!;"));

            services.AddControllersWithViews().AddRazorRuntimeCompilation();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            //인증서비스 제공
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseStatusCodePages();

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Login}/{action=Index}/{id?}");
            });
        }
    }
}
