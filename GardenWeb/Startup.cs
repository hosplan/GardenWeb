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
                    //Issuer�� ��ȿ�� ����
                    ValidateIssuer = true,
                    //Audience�� ��ȿ�� ����
                    ValidateAudience = true,
                    //Token�� �����ֱ�
                    ValidateLifetime = true,
                    //Token�� ��ȿ���� ����
                    ValidateIssuerSigningKey = true,
                    //Token�� ������
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    //û���� �����Ѵ� Ư���� ��찡 �ƴϸ� JWT������ �����ϴ� ������ ����
                    ValidAudience = Configuration["Jwt:Audience"],
                    //Token�� ������ ��ȣȭŰ ����
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                    //�ð��� Ȯ���� �� ������ Ŭ�� ��ť ���� �ð� ����
                    ClockSkew = TimeSpan.Zero
                };
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("RoleGrade", policy =>
                    policy.Requirements.Add(new MinimumGradeRequirement(3)));
            });
            //�ؽ� ���� �߰�
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

            //�������� ����
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
